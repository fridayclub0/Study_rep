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
class Talk < ActiveRecord::Base
end

get '/' do  #'/'はそのページのルートを表す
  erb :index  #erb :テンプレート名　はそのテンプレートを返す
end

post '/database' do
  table = params[:table]
  return_data = 'success?'
  
  if table == 'Test' then
    mode = params[:mode]
    file_id = params[:file_id]
    title = params[:title]
    file_text = params[:file_text]
    if mode == 'edit_wiki' then
      p file_id
      p Wiki.where(:file_id=>file_id)
      Wiki.where(:file_id=>file_id).update(:wiki_title=>title)
    end
    if mode == 'new_wiki' then
      p 'new_wiki'
      Wiki.create(:file_id=>file_id,:wiki_title=>title)
    end
    if mode == 'edit_talk' then
      p file_id
      p Talk.where(:file_id=>file_id)
      Talk.where(:file_id=>file_id).update(:talk_title=>title)
    end
    if mode == 'new_talk' then
      p 'new_talk'
      Talk.create(:file_id=>file_id,:talk_title=>title)
    end
    
    if mode == 'new_wiki'||mode == 'edit_wiki' then
      File.open('./public/testfiles/'+file_id+'.md','w+:utf-8') do |file|
        file.write(file_text+"\n")
        file.close
      end
    end
    
    
    if mode == 'new_talk'||mode == 'edit_talk' then
      File.open('./public/talkfiles/'+file_id+'.md','w+:utf-8') do |file|
        file.write(file_text+"\n")
        file.close
      end
      File.open('./public/talk_comment_files/'+file_id+'.md','w+:utf-8') do |file|
        file.close
      end
    end
       
    return_data=file_text
  end
  
  if table == 'fetch_wiki_title' then
    wiki_list = Wiki.limit(20) #.order('file_no DESC') #.limit(list_num)
    p wiki_list.to_json
    return_data=wiki_list.to_json
  end
  
  if table == 'fetch_talk_title' then
    talk_list = Talk.order('file_no DESC').limit(20)
    p talk_list.to_json
    return_data=talk_list.to_json
  end
  
  if table == 'get_wiki_data' then
    file_id = params[:file_id];
    File.open('./public/testfiles/'+file_id+'.md','r:utf-8') do |file|
      return_data=file.read
      file.close
    end
  end
  
  if table == 'get_talk_data' then
    file_id = params[:file_id];
    return_data = JSON.parse(Talk.where(:file_id=>file_id).to_json)
    p return_data
    File.open('./public/talkfiles/'+file_id+'.md','r:utf-8') do |file|
      return_data[0]['content']=file.read
      file.close
    end
    comments=[]
    File.open('./public/talk_comment_files/'+file_id+'.md','r:utf-8') do |file|
      while line = file.gets
        comments.unshift(JSON.parse(line))
      end
      file.close
    end
    return_data[0]['comments']=comments
    return_data = return_data.to_json
  end
  
  if table == 'talk_comment' then
      p 'talk_comment'
      file_id = params[:file_id];
      comment = params[:comment];
      File.open('./public/talk_comment_files/'+file_id+'.md','a:utf-8') do |file|
        comment_data={'author'=>'guest','time'=>'time','comment'=>comment}
        file.write(comment_data.to_json+"\n")
        file.close
      end
  end
    
  return_data
end 