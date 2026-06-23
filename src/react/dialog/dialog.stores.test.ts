import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useConfirmAlertDialogStore, useDialogStore } from './dialog.stores';
import type { ConfirmDialogProps } from './dialog.types';

const resetStores = () => {
  useDialogStore.setState({ key: undefined, props: undefined });
  useConfirmAlertDialogStore.setState({ props: undefined });
};

describe('useDialogStore', () => {
  beforeEach(() => resetStores());

  it('초기 상태는 비어 있어야 한다', () => {
    const s = useDialogStore.getState();
    expect(s.key).toBeUndefined();
    expect(s.props).toBeUndefined();
  });

  it('open(key, props)로 열리고 close()로 닫힌다', () => {
    useDialogStore.getState().open('any-dialog' as never, { a: 1 } as never);
    expect(useDialogStore.getState().key).toBe('any-dialog');
    expect(useDialogStore.getState().props).toEqual({ a: 1 });

    useDialogStore.getState().close();
    expect(useDialogStore.getState().key).toBeUndefined();
    expect(useDialogStore.getState().props).toBeUndefined();
  });

  it('forceClose()도 닫힌 상태로 만든다', () => {
    useDialogStore.getState().open('x' as never, {} as never);
    useDialogStore.getState().forceClose();
    expect(useDialogStore.getState().key).toBeUndefined();
    expect(useDialogStore.getState().props).toBeUndefined();
  });
});

describe('useConfirmAlertDialogStore', () => {
  beforeEach(() => resetStores());

  it('confirm() 호출 시 props가 설정되고 onOk로 true resolve, 기존 다이얼로그도 닫힌다', async () => {
    // 기존 다이얼로그를 일부러 열어둠(확인 시 닫히는지 확인)
    useDialogStore.getState().open('dummy' as never, { foo: 'bar' } as never);

    const onOk = vi.fn();
    const p = useConfirmAlertDialogStore.getState().confirm({
      title: 't',
      description: 'd',
      onOk,
      onCancel: vi.fn(),
      okText: '확인',
      cancelText: '취소',
    });

    // confirm()이 세팅한 props 확보
    const props = useConfirmAlertDialogStore.getState().props!;
    expect(props.type).toBe('confirm');
    expect(typeof props.close).toBe('function');

    // onOk 트리거
    props.onOk?.();

    await expect(p).resolves.toBe(true);
    expect(onOk).toHaveBeenCalled();

    // confirm store는 닫힘
    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
    // 기존 다이얼로그도 닫힘
    expect(useDialogStore.getState().key).toBeUndefined();
  });

  it('confirm()에서 onCancel로 false resolve, 기존 다이얼로그는 닫지 않는다', async () => {
    useDialogStore.getState().open('dummy' as never, {} as never);

    const onCancel = vi.fn();
    const p = useConfirmAlertDialogStore.getState().confirm({
      title: 't',
      description: 'd',
      onCancel,
      cancelText: '취소',
    });

    const props = useConfirmAlertDialogStore.getState().props!;
    expect(props.type).toBe('confirm');

    // onCancel 트리거
    (props as ConfirmDialogProps).onCancel?.();

    await expect(p).resolves.toBe(false);
    expect(onCancel).toHaveBeenCalled();

    // confirm store는 닫힘
    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
    // 기존 다이얼로그는 유지됨(코드상 onCancel에서는 닫지 않음)
    expect(useDialogStore.getState().key).toBe('dummy');
  });

  it('alert() 호출 시 onOk로 true resolve, 기존 다이얼로그도 닫힌다', async () => {
    useDialogStore.getState().open('dummy' as never, {} as never);

    const onOk = vi.fn();
    const p = useConfirmAlertDialogStore.getState().alert({
      title: '알림',
      description: '메시지',
      onOk,
      okText: '확인',
    });

    const props = useConfirmAlertDialogStore.getState().props!;
    expect(props.type).toBe('alert');

    props.onOk?.();

    await expect(p).resolves.toBe(true);
    expect(onOk).toHaveBeenCalled();

    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
    expect(useDialogStore.getState().key).toBeUndefined();
  });



  it('dismiss()는 confirm Promise를 false로 resolve한다', async () => {
    const onCancel = vi.fn();
    const p = useConfirmAlertDialogStore.getState().confirm({
      title: '닫힘 테스트',
      description: 'Esc/backdrop 닫힘',
      onCancel,
    });

    useConfirmAlertDialogStore.getState().dismiss();

    await expect(p).resolves.toBe(false);
    expect(onCancel).toHaveBeenCalled();
    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
  });

  it('dismiss()는 alert Promise를 기본 false로 resolve한다', async () => {
    const p = useConfirmAlertDialogStore.getState().alert({
      title: '알림',
      description: 'Esc/backdrop 닫힘',
    });

    useConfirmAlertDialogStore.getState().dismiss();

    await expect(p).resolves.toBe(false);
    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
  });

  it('open()/close()는 단순히 props 세팅/해제', () => {
    useConfirmAlertDialogStore.getState().open({
      type: 'alert',
      title: 'a',
      description: 'b',
      close: () => {},
    });
    expect(useConfirmAlertDialogStore.getState().props?.title).toBe('a');

    useConfirmAlertDialogStore.getState().close();
    expect(useConfirmAlertDialogStore.getState().props).toBeUndefined();
  });
});
