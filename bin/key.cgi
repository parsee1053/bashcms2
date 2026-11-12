#!/bin/bash -euxv
source "$(dirname $0)/conf"
exec 2> "$logdir/$(basename $0).$(date +%Y%m%d_%H%M%S).$$"

word=$(nkf --url-input <<< "${QUERY_STRING}" | sed 's/^key=//' | tr -d '\r\n')
# 表示用に全文字を数値文字参照にする（HTML・Markdownとして解釈させない）
numchar=$(printf '%s' "$word" | nkf -w16B0 | xxd -plain | tr -d '\n' | sed 's/..../\&#x&;/g')

{
echo "## Keyword: $numchar"
tac "$datadir/keyword_list"      |
grep -F -- ",$word,"             |
awk '{print $1}'                 |
xargs -I@ cat "$datadir/@/link"  |
sed 's/^/* /'
}                                |
pandoc --template="$viewdir/template.html" --wrap=none
