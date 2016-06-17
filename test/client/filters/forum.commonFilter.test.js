describe('myApp', function () {
    beforeEach(function () {
        module('myApp');
    });
    it('filter Data', inject(function($filter) {
        expect().not.toBeNull();

    }));
    // it("should return true if the input is not equal some date", inject(function ($filter) {
    //     expect($filter('myDate')(null)).toMatch('');
    //     expect($filter('myDate')('05-06-2016')).toMatch('06-05-2016');
    //     expect($filter('myDate')('05/06/2016')).toMatch('06-05-2016');
    //
    // }));


});