(function () {
  
  "use strict";

  angular
    .module('app', ['ui.router', 'app.dashboard', 'app.portfolio', 'app.botbar', 'app.leagueResults', 'ngFileUpload', 'app.profile', 'angularCharts', 'ngSanitize']);
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
          templateUrl: 'watchlist/watchlist.html'
        })

        .state('ticker',{
          url:'/ticker',
          controller: 'tickerController',
          templateUrl:'ticker/ticker.html'
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
          templateUrl: 'analysis/analysis.html'
        })

        .state('forum', {
          url: '/forum',
          authenticate: true,
          controller: 'MainForumController',
          templateUrl: 'forum/main.html'
        })

        .state('messages', {
          url: '/messages',
          authenticate: true,
          controller: 'MessagesController',
          templateUrl: 'messages/messages.html'
        })

        .state('topic', {
          url: '/topics/:topicId',
          authenticate: true,
          controller: 'TopicController',
          templateUrl: 'topic/topic.html'
        })

        .state('account', {
          url: '/account',
          authenticate: true,
          controller: 'AccountController',
          templateUrl: 'account/account.html'
        })

        .state('profiles', {
          url: '/profiles/:userId',
          authenticate: false,
          views: {
            '': {
              controller: 'ProfileController',
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
              controller: 'LeagueController'
            },
            //child views 
            'order@league': {
              controller: 'orderStatusController',
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
              templateUrl: 'news/news.html'
            },
            // recent transactions view within league page
            'recentTransactions@league': {
              controller: 'recentTransactionsController',
              templateUrl: 'recentTransactions/recentTransactions.html'
            },
            // message board view within league page
            'messageboard@league': {
              controller: 'MessageBoardController',
              templateUrl: 'messageboard/messageboard.html'
            },
            // league results view within league page
            'leagueResults@league': {
              controller: 'LeagueResultsController',
              templateUrl: 'leagueResults/leagueResults.html'
            },
            // before league starts view within league page
            'preleague@league': {
              controller: 'PreLeagueController',
              templateUrl: 'preleague/preleague.html'
            },
            // symbol lookup modal view
            'symbol@league':{
              controller: 'SymbolController',
              templateUrl: 'symbol/symbol.html'
            }
          }
        });
    };
})()
