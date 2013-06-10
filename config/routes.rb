Hum::Application.routes.draw do
  root :to => 'application#index'
  resources :submission
  
  scope :path => "admin" do
    root :to => 'admin_base#index'
    
    resources :submissions, :only => [:index]
    resources :mission
    resources :thework
    resources :artist
    resources :workitem
  end
end
