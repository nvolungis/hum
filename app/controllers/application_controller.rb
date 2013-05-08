class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def index 
    @mission = Mission.first
    @thework = Thework.first
    @submission = Submission.new
  end
  
end