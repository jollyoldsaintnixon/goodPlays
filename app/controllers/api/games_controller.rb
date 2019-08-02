class Api::GamesController < ApplicationController

  def index
    @games = Game.with_attached_image
  end

  def show
    @game = Game.find(params[:id])
  end


end
