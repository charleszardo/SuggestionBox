Rails.application.routes.draw do
  root "suggestions#index"

  resources :users

  resource :session, only: [:new, :create]
  resources :sessions, only: [:destroy]

  resources :suggestions do
    resources :votes, only: [:create]
  end

  resources :comments, except: [:index]

  # resources :votes, only: [] do
  #   collection do
  #     post "up"
  #     post "down"
  #   end
  # end
end
