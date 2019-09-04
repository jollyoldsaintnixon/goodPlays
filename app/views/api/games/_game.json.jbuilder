url = game.image
url = "https://i.ytimg.com/vi/7NXGXrlQ2ZM/maxresdefault.jpg" if !url || url == ""
json.extract! game, :id, :title, :description, :release_date, :image_url, :developer_id, :price, 
    :rating, :genres, :categories, :rating_count#, :game_comment_ids
json.imageUrl url_for(url)
