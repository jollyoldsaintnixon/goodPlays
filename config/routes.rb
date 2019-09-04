Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do  #default to json vs html
    resources :users, only: [:create, :show]
      resources :game_comments, only: []
    resource :session, only: [:create, :destroy]
    resources :games, only: [:index, :show, :update]
    resources :game_racks, only: [:create, :destroy]
    get 'count', to: 'games#count'  # made this route to know when we had pulled all the games from the db for our mcgyvered async db pull
  end
  resources :game_comments   #, only: [:index, :show, :create, :update, :destroy]
  
  root to: 'static_pages#root' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
