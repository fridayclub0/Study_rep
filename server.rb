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
class Wiki < ActiveRecord::Base
end

get '/' do  #'/'はそのページのルートを表す
  erb :index  #erb :テンプレート名　はそのテンプレートを返す
end

post'/database' do
  table = params[:table]
  return_data = 0
  
  if table == 'Test' then
    mode = params[:mode]
    file_id = params[:file_id]
    title = params[:title]
    file_text = params[:file_text]
    if mode == 'edit' then
      p file_id
      p Wiki.where(:file_id=>file_id)
      Wiki.where(:file_id=>file_id).update(:wiki_title=>title)
    end
    if mode == 'new' then
      p 'new'
      Wiki.create(:file_id=>file_id,:wiki_title=>title)
    end
    File.open('./public/testfiles/'+file_id+'.md','w+:utf-8') do |file|
      file.write(file_text+"\n")
      file.close
    end
    return_data=file_text
  end
  
  if table == 'fetch_wiki_title' then
    wiki_list = Wiki.limit(20) #.order('file_no DESC') #.limit(list_num)
    p wiki_list.to_json
    return_data=wiki_list.to_json
  end
  
  if table == 'get_wiki_data' then
    file_id = params[:file_id];
    File.open('./public/testfiles/'+file_id+'.md','r:utf-8') do |file|
      return_data=file.read
      file.close
    end
  end
  return_data
end 