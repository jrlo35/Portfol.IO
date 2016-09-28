describe('NewsController', function(){

	var NewsController;
	var NewsFactory;

	beforeEach(angular.mock.module('app.news'));

	beforeEach(inject(function(_$controller_,_News_){
      $controller = _$controller_;
      NewsFactory = _News_;
	}));

	NewsController = $controller('NewsController', {News: News});

	it('should be defined', function(){
		expect(NewsController).toBeDefined();
		expect(NewsFactory).toBeDefined();
	})

	describe('should return tweets', function() {
		var result;

    NewsFactory.getNews(1,1)
    .then(function(res){
      result = res;
    })
		
		expect(NewsFactory.getNews).toHaveBeenCalledWith(1,1);
		expect(result.length).toEqual(10);

	})
})