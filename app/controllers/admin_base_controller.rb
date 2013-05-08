class AdminBaseController < ApplicationController
  def index
    @mission = Mission.first
    @thework = Thework.first
  end  
end
