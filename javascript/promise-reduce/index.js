let firstFunc = () => new Promise(resolve => {
	console.log("it's a firstFunc");
	resolve(1);
});

let secondFunc = () => new Promise(resolve => {
	console.log("it's a secondFunc");
	setTimeout(() => resolve(2), 1000);
});

let thirdFunc = () => new Promise(resolve => {
	console.log("it's a thirdFunc");
	setTimeout(() => resolve(3), 1000);
});


function promiseReduce(asyncFunctions, reduce, initialValue) {
	let promiseChain = Promise.resolve();
	let current = initialValue;

	asyncFunctions.forEach(func => {
		promiseChain = promiseChain
			.then(() => func())
			.then(result => {
				current = reduce(result, current);
				return current;
			});
	});

	return promiseChain;
}

promiseReduce(
	[firstFunc, secondFunc, thirdFunc],
	function (memo, value) {
		console.log('reduce');
		return memo * value;
	},
	1
)
	.then(console.log);

