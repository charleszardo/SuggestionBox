Rails.application.routes.draw do
  # root "suggestions#index"
  root to: 'application#angular'

  # resources :users
  #
  # resource :session, only: [:new, :create]
  # resources :sessions, only: [:destroy]

  resources :suggestions, except: [:new] do
    resources :votes, only: [:create]
    resources :comments, only: [:show, :create]
  end

  resources :comments, only: [:show] do
    resources :votes, only: [:create]
  end
end
