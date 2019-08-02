Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do  #default to json vs html
    resources :users, only: :create
    resource :session, only: [:create, :destroy]
    resources :games, only: [:index, :show]
  end

  root to: 'static_pages#root' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
