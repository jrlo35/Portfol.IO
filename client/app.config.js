(function () {
  
  "use strict";

  angular
    .module('app', [
      'ui.router',
      'app.dashboard', 
      'app.portfolio', 
      'app.botbar', 
      'app.leagueResults',
      'app.leaderboard',
      'app.news',
      'app.recentTransactions',
      'app.symbol',
      'app.ticker',
      'app.watchlist', 
      'ngFileUpload', 
      'app.profile', 
      'angularCharts', 
      'ngSanitize']);
    .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function configure($stateProvider, $urlRouterProvider, $httpProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider

        .state('signin', {
          url: '/',
          authenticate: true,
          controller: 'SigninController',
          controllerAs: 'signin',
          templateUrl: 'signin/signin.html'
        })

        .state('watchlist', {
          url: '/watchlist',
          authenticate: true,
          controller: 'WatchlistController',
          controllerAs: 'watchlist',
          templateUrl: 'watchlist/watchlist.html'
        })

        .state('dashboard', {
          url: '/dashboard',
          authenticate: true,
          views: {
            '': {
              controller: 'DashboardController',
              controllerAs: 'dashboard',
              templateUrl: 'dashboard/dashboard.html'
            }
          }
        })

        .state('analysis', {
          url: '/analysis',
          controller: 'AnalysisController',
          controllerAs: 'analysis',
          templateUrl: 'analysis/analysis.html'
        })

        .state('forum', {
          url: '/forum',
          authenticate: true,
          controller: 'MainForumController',
          controllerAs: 'forum',
          templateUrl: 'forum/main.html'
        })

        .state('messages', {
          url: '/messages',
          authenticate: true,
          controller: 'MessagesController',
          controllerAs: 'message',
          templateUrl: 'messages/messages.html'
        })

        .state('topic', {
          url: '/topics/:topicId',
          authenticate: true,
          controller: 'TopicController',
          controllerAs: 'topic',
          templateUrl: 'topic/topic.html'
        })

        .state('account', {
          url: '/account',
          authenticate: true,
          controller: 'AccountController',
          controllerAs: 'controller',
          templateUrl: 'account/account.html'
        })

        .state('profiles', {
          url: '/profiles/:userId',
          authenticate: false,
          views: {
            '': {
              controller: 'ProfileController',
              controllerAs: 'profile',
              templateUrl: 'profile/profile.html'
            },
            'badges@profiles': {
              controller: 'BadgeController',
              controllerAs: 'badge',
              templateUrl: 'badges/badge.html'
            }
          }
        })

        .state('league', {
          url: '/leagues/:leagueId',
          authenticate: true,
          views: {
            /*main view of the entire league template*/
            '': {
              templateUrl: 'league/league.html',
              controller: 'LeagueController',
              controllerAs: 'league'
            },
            //child views 
            'order@league': {
              controller: 'orderStatusController',
              controllerAs: 'orderStatus',
              templateUrl: 'orderStatus/orderStatus.html'
            },
            // portfolio view within the league page
            'portfolio@league': {
              controller: 'PortfolioController',
              controllerAs: 'portfolio',
              templateUrl: 'portfolio/portfolio.html'
            },
            // leaderboard view within league page
            'leaderboard@league': {
              controller: 'LeaderBoardController',
              controllerAs: 'leaderboard',
              templateUrl: 'leaderboard/leaderboard.html'
            },
            // news/analysis view within league page
            'news@league': {
              controller: 'NewsController',
              controllerAs: 'news',
              templateUrl: 'news/news.html'
            },
            // recent transactions view within league page
            'recentTransactions@league': {
              controller: 'recentTransactionsController',
              controllerAs: 'recent',
              templateUrl: 'recentTransactions/recentTransactions.html'
            },
            // message board view within league page
            'messageboard@league': {
              controller: 'MessageBoardController',
              controllerAs: 'messageboard',
              templateUrl: 'messageboard/messageboard.html'
            },
            // league results view within league page
            'leagueResults@league': {
              controller: 'LeagueResultsController',
              controllerAs: 'results',
              templateUrl: 'leagueResults/leagueResults.html'
            },
            // before league starts view within league page
            'preleague@league': {
              controller: 'PreLeagueController',
              controllerAs: 'preleague',
              templateUrl: 'preleague/preleague.html'
            },
            // symbol lookup modal view
            'symbol@league':{
              controller: 'SymbolController',
              controllerAs: 'symbol',
              templateUrl: 'symbol/symbol.html'
            }
          }
        });
    };
})()
