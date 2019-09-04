class Api::GamesController < ApplicationController
  # caches_action :index

  def index
    expires_in 24.hours, :public => true
    # @games = Game.with_attached_image.page(params[:page]).per(25)
    @games = Game.with_attached_image
    render :index
  end

  def show
    @game = Game.includes(:game_comments).find(params[:id])
  end

  def update
    game = Game.find(params[:comment][:game_id])
    game_rating = game.rating ? game.rating : 0
    game_rating_count = game.rating_count
    comment_rating = params[:comment][:rating]
    new_game_rating = ((game_rating * game_rating_count) + comment_rating) / game_rating_count + 1
    debugger
    if game.update(rating: new_game_rating, rating_count: game_rating_count + 1)

      render :show
    else
      render json: ['Could not rate game'], status: 422
    end
  end

  def count
    
    count = Game.count
    #  
    render json: {count: count}
  end


end
