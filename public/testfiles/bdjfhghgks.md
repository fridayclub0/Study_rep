```
if table == 'Test' then
    file_id = params[:file_id]
    title = params[:title]
    file_text = params[:file_text]
    Test.create(:file_id=>file_id,:wiki_title=>title)
    File.open('./public/testfiles/'+file_id+'.md','w+:utf-8') do |file|
      file.write(file_text+"\n")
      file.close
    end
  end
```
てすと

