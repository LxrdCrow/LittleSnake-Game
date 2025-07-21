export enum ClockType { TIMED, INFINITE }
export enum ClockTick { EVEN, ODD }

export class Timer {
    private handle: number | null = null;
    private interval: number;
    private duration: number;

    public type: ClockType;
    public tick: ClockTick = ClockTick.EVEN;
    public is_running: boolean = false;
    public is_paused: boolean = false;

    private handler: () => void;

    constructor(interval: number, duration: number, handler: () => void) {
        this.interval = interval;
        this.duration = duration;
        this.handler = handler ?? (() => console.log("No clock event"));
        this.type = (duration === 0) ? ClockType.INFINITE : ClockType.TIMED;
    }

    private on_elapsed = (): void => {
        if (this.is_paused) return;

        this.tick = (this.tick === ClockTick.EVEN)
            ? ClockTick.ODD
            : ClockTick.EVEN;

        this.handler();

        if (this.type === ClockType.TIMED) {
            this.stop();
        }
    };

    public start(): void {
        if (this.is_running) {
            this.stop(); 
        }

        this.is_running = true;

        if (this.type === ClockType.INFINITE) {
            this.handle = window.setInterval(this.on_elapsed, this.interval);
        } else {
            this.handle = window.setTimeout(this.on_elapsed, this.interval);
        }
    }

    public stop(): void {
        if (!this.handle) return;

        this.is_running = false;

        if (this.type === ClockType.INFINITE) {
            window.clearInterval(this.handle);
        } else {
            window.clearTimeout(this.handle);
        }

        this.handle = null;
    }

    public pause(): void {
        this.is_paused = true;
    }

    public resume(): void {
        this.is_paused = false;
    }
}
