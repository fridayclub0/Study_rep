# -*- coding: utf-8 -*-

#sinatraフレームワーク関連
require 'sinatra'
require 'sinatra/reloader'

#データベース関連
#require 'sqlite3'
#require 'active_record'
#ActiveRecord::Base.establish_connection(
#  "adapter" => "sqlite3",
#  "database" => "./database_name.db"
#)
#class Member < ActiveRecord::Base
#end ・・・こんな感じで読み込む　テーブル名は最後にsをつけること ex members

get '/' do
  erb :index
end



