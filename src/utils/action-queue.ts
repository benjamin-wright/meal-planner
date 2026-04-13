export class ActionQueue {
  private actions: (() => Promise<void>)[] = [];
  private isProcessing = false;

  enqueue(action: () => Promise<void>) {
    this.actions.push(action);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.actions.length > 0) {
      const action = this.actions.shift();
      if (action) {
        try {
          await action();
        } catch (error) {
          console.error("Error processing action:", error);
        }
      }
    }

    this.isProcessing = false;
  }
}
