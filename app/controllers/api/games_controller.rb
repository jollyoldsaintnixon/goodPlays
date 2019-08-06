class Api::GamesController < ApplicationController
  # caches_action :index

  def index
    @games = Game.with_attached_image
    render :index
  end

  def show
    @game = Game.find(params[:id])
  end


end
