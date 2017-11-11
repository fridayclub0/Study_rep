# -*- coding: utf-8 -*-
require 'json'

#sinatraフレームワーク関連
require 'sinatra'
require 'sinatra/reloader'


#データベース関連
require 'sqlite3'
require 'active_record'
ActiveRecord::Base.establish_connection(
  "adapter" => "sqlite3",
  "database" => "./example.db"
)
class Test < ActiveRecord::Base
end
# ・・・こんな感じで読み込む　テーブル名は最後にsをつけること ex members

#'/'はそのページのルートを表す
get '/' do
  erb :index
#erb :テンプレート名　はそのテンプレートを返す
end

post'/database' do
  table = params[:table]
  
  if table == 'Test' then
    file_id = params[:file_id]
    file_text = params[:file_text]
    Test.create(:file_id=>file_id,:file_text=>file_text)
    File.open('./public/testfiles/'+file_id+'.txt','w+:utf-8')do|file|
      file.write(file_text+"\n")
      file.close
    end
  end

  'success'
end 