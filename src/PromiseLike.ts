interface Callback{ (): any };
interface Resolve{ (): void };
interface Executor{ ( cb: Resolve ): void };

const global: any = window;
const isPromiseSuppoted: boolean = typeof global.Promise === 'function';
export default isPromiseSuppoted ? global.Promise : class PromiseLike {

	constructor( executor: Executor ) {

		let callback = () => {};
		const resolve = () => {

			callback();

		};
		executor( resolve );

		return {
			then( _callback: Callback ) {

				callback = _callback;

			}
		};

	}

};
