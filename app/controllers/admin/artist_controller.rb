class Admin::ArtistController < AdminBaseController
  def index
    @artists = Artist.all
  end
  
  def edit
    @artist = Artist.find(params[:id])
  end

	def update
	 logger.debug "#{params[:id]}"
		@artist = Artist.find(params[:id])
		if @artist.update_attributes(params[:artist])
      flash['alert-success'] = 'artist has been updated.'
      redirect_to admin_root_path
    else
      flash['alert-error'] = 'artist has not been updated.'
      render :action => "edit"
    end
	end
end
