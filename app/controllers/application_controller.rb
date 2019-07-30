class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user) #dangerous due to reset_token!
    session[:session_token] = user.reset_token! #gets rid of any dangling token while setting the session cookie's key of :session_token to match the user's token
    @current_user = user #set user as current_user IOT to avoid a DB hit when asked for current_user
  end

  def log_out! #clear out all traces of a match between current_user and session[:session_token]
    current_user.reset_token! 
    @current_user = nil
    session[:session_token] = nil
  end

  def ensure_logged_in
    unless current_user
      render '/api/session'  #render log in page if not logged in. figure out how to add errors
    end
  end
end
