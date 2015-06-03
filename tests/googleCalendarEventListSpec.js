/**
* Yes I'm a complete nerd... 
*/
describe('addZero', function() {
	it('should pad a zero for numbers < 10', function() {
		expect(addZero(9)).toEqual('09');
	});

	it('should NOT pad zero for numbers > 9', function() {
		expect(addZero(10)).toEqual('10');
	});

	it('should retrun string for non-number', function() {
		expect(addZero('poo')).toEqual('poo');
	});
});

describe('formatDateTime', function() {
	it('should return formatted datetime string', function() {
		var old = new Date('1968-11-25:4:20');

		expect(formatDateTime(old)).toEqual('1968-11-25T04:20:00-04:20');
	});
});