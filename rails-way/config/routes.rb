#require "api/diffy/api"

Rails.application.routes.draw do
  mount Diffy::API => '/'

  get 'comments/index'
  root 'diffs#index'
  resources :diffs, export: true do
    resources :comments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
