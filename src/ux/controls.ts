import { Direction } from '../types/index.js';
import { Game } from '../game.js';

export class Controls {

	static last_key: string | null = null;

	static on_key_up = (ev: KeyboardEvent): void => {
        Controls.last_key = ev.key.toLowerCase();
    };

	static on_key_down = (ev: KeyboardEvent): void => {
		//ignore input if user is typing in input/textarea
		if ((ev.target as HTMLElement).tagName === 'INPUT' || (ev.target as HTMLElement).tagName === 'TEXTAREA') {
			return;
		}

		// Block default behavior for game controls
		switch (ev.key.toLowerCase()) {
			case "w":
			case "arrowup":
			case "s":
			case "arrowdown":
			case "a":
			case "arrowleft":
			case "d":
			case "arrowright":
			case " ":
				ev.preventDefault();
				break;
		}

		Controls.last_key = ev.key.toLowerCase();
	};

	static process_input(): void {
		if (!Controls.last_key) return;

		switch (Controls.last_key) {
			case "w":
			case "arrowup":
				if (Game.player.direction !== Direction.DOWN) {
					Game.player.direction = Direction.UP;
				}
				break;

			case "s":
			case "arrowdown":
				if (Game.player.direction !== Direction.UP) {
					Game.player.direction = Direction.DOWN;
				}
				break;

			case "a":
			case "arrowleft":
				if (Game.player.direction !== Direction.RIGHT) {
					Game.player.direction = Direction.LEFT;
				}
				break;

			case "d":
			case "arrowright":
				if (Game.player.direction !== Direction.LEFT) {
					Game.player.direction = Direction.RIGHT;
				}
				break;

			case " ":
				Game.player.jump();
				break;
		}

		Controls.last_key = null;
	}
}
