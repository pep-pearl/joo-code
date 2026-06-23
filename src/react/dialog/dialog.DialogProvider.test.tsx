import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DialogProvider from './dialog.DialogProvider';
import { useConfirmAlertDialogStore, useDialogStore } from './dialog.stores';

/**
 * ConfirmAlertDialog를 간이 컴포넌트로 모킹
 * - Provider가 넘겨주는 props를 그대로 표시/사용만 한다.
 * - 버튼 클릭 시 close()를 호출해 닫히도록 구현.
 */
vi.mock('./dialog.ConfirmAlertDialog', () => {
  const Mock: React.FC<any> = ({ props }: any) => {
    return (
      <div data-testid="confirm-alert">
        <div>type:{props.type}</div>
        <button onClick={() => props.close?.()}>close-confirm</button>
      </div>
    );
  };
  return { default: Mock };
});

// Provider가 렌더링할 더미 다이얼로그
const MainDialog: React.FC<any> = ({ label }: any) => <div data-testid="main-dialog">main:{label ?? 'no-label'}</div>;

// 스토어 초기화 유틸
const resetStores = () => {
  useDialogStore.setState({ key: undefined, props: undefined });
  useConfirmAlertDialogStore.setState({ props: undefined });
};

describe('DialogProvider - ConfirmAlertDialog 오버레이 시 가시성 제어', () => {
  beforeEach(() => {
    resetStores();
    render(<DialogProvider dialogMap={{ dummy: MainDialog }} fallback={null} />);
  });

  it('기존 dialog가 열린 상태에서 ConfirmAlertDialog가 열리면 기존 dialog는 aria-hidden 처리되고, confirm이 닫히면 다시 활성화된다', async () => {
    // 1) 기존 다이얼로그 열기
    await act(async () => {
      useDialogStore.getState().open('dummy' as never, { label: 'A' } as never);
    });

    await waitFor(() => expect(screen.getByTestId('main-dialog')).toBeVisible());

    // 2) ConfirmAlertDialog 열기
    await act(async () => {
      useConfirmAlertDialogStore.getState().confirm({
        title: 't',
        description: 'd',
        cancelText: '취소',
      });
    });

    // ConfirmAlertDialog가 표시됨
    await waitFor(() => expect(screen.getByTestId('confirm-alert')).toBeVisible());

    // 기존 다이얼로그는 DOM에는 존재하지만 aria-hidden 처리되어야 함
    const mainDialog = screen.getByTestId('main-dialog');
    const hiddenAncestor = mainDialog.closest('[aria-hidden="true"]');
    expect(hiddenAncestor).not.toBeNull();

    // 3) ConfirmAlertDialog 닫기
    await act(async () => {
      screen.getByText('close-confirm').click();
    });

    // ConfirmAlertDialog는 사라지고
    await waitFor(() => expect(screen.queryByTestId('confirm-alert')).toBeNull());

    // 기존 다이얼로그는 다시 aria-hidden이 해제됨 (활성화)
    await waitFor(() => {
      const visibleDialog = screen.getByTestId('main-dialog');
      const hiddenAncestorAfter = visibleDialog.closest('[aria-hidden="true"]');
      expect(hiddenAncestorAfter).toBeNull();
      expect(visibleDialog).toBeVisible();
    });
  });
});
