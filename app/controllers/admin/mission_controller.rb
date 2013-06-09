class Admin::MissionController < Admin::AdminBaseController
  def index
    @mission = Mission.first
  end
  
  def edit
    @mission = Mission.find(params[:id])
  end

	def update
		@mission = Mission.find(params[:id])
		if @mission.update_attributes(params[:mission])
      flash['alert-success'] = 'mission has been updated.'
      redirect_to admin_root_path
    else
      flash['alert-error'] = 'mission has not been updated.'
      render :action => "edit"
    end
	end
end
