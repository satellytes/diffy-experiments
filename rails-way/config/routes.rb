Rails.application.routes.draw do
  get 'comments/index'
  root 'diffs#index'
  resources :diffs do
    resources :comments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
