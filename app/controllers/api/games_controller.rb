class Api::GamesController < ApplicationController
  # caches_action :index

  def index
    expires_in 24.hours, :public => true
    # @games = Game.with_attached_image.page(params[:page]).per(25)
    @games = Game.with_attached_image
    render :index
  end

  def show
    @game = Game.find(params[:id])
  end

  def count
    
    count = Game.count
    #  
    render json: {count: count}
  end


end
