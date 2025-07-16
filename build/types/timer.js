export var ClockType;
(function (ClockType) {
    ClockType[ClockType["TIMED"] = 0] = "TIMED";
    ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
})(ClockType || (ClockType = {}));
export var ClockTick;
(function (ClockTick) {
    ClockTick[ClockTick["EVEN"] = 0] = "EVEN";
    ClockTick[ClockTick["ODD"] = 1] = "ODD";
})(ClockTick || (ClockTick = {}));
export class Timer {
    constructor(interval, duration, handler) {
        this.handle = null;
        this.tick = ClockTick.EVEN;
        this.is_running = false;
        this.is_paused = false;
        this.on_elapsed = () => {
            if (this.is_paused)
                return;
            // Alterna EVEN/ODD
            this.tick = (this.tick === ClockTick.EVEN)
                ? ClockTick.ODD
                : ClockTick.EVEN;
            // Esegui handler
            this.handler();
            // Ferma se è un timer singolo
            if (this.type === ClockType.TIMED) {
                this.stop();
            }
        };
        this.interval = interval;
        this.duration = duration;
        this.handler = handler !== null && handler !== void 0 ? handler : (() => console.log("No clock event"));
        this.type = (duration === 0) ? ClockType.INFINITE : ClockType.TIMED;
    }
    start() {
        if (this.is_running) {
            this.stop(); // Previene duplicazioni
        }
        this.is_running = true;
        if (this.type === ClockType.INFINITE) {
            this.handle = window.setInterval(this.on_elapsed, this.interval);
        }
        else {
            this.handle = window.setTimeout(this.on_elapsed, this.interval);
        }
    }
    stop() {
        if (!this.handle)
            return;
        this.is_running = false;
        if (this.type === ClockType.INFINITE) {
            window.clearInterval(this.handle);
        }
        else {
            window.clearTimeout(this.handle);
        }
        this.handle = null;
    }
    pause() {
        this.is_paused = true;
    }
    resume() {
        this.is_paused = false;
    }
}
