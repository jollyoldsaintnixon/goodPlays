
json.extract! game, :id, :title, :description, :release_date, :image_url, :developer_id, :price, :rating, :genres, :categories
json.imageUrl url_for(game.image)
