# 編集から投稿、表示までテスト

## これはテストです

| Left align | Right align | Center align | 
|:-----------|------------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

```
if table == 'fetch_wiki_title' then
    wiki_list = Wiki.limit(5) #.order('file_no DESC') #.limit(list_num)
    p wiki_list.to_json
    return_data=wiki_list.to_json
  end
```

