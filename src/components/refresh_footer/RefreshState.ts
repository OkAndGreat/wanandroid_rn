export enum RefreshState {
    Idle = 'Idle',               // 初始状态，无刷新的情况
    Refreshing = 'Refreshing',   // 正在刷新中
    NoMoreData = 'NoMoreData',   // 没有更多数据了
    Failure = 'Failure'          // 刷新失败
}
