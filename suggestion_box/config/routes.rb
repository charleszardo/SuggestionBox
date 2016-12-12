Rails.application.routes.draw do
  resources :users

  resource :session, only: [:new, :create]
  resources :sessions, only: [:destroy]

  resources :suggestions

  resources :comments, except: [:index]
end
