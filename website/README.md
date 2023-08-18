# Přechod na verzi 2

## Cesty ke cvičením

Místo `cvlekce>cviceni` se nyní píše `cvlekce/cviceni`.

Příkad pro nahrazení:

```bash
find . -type f -name "*.md" -print0 | xargs -0 sed -i ':a; s/\(::exc\[[^]]*\)>/\1\//g; ta'
```

##

```bash
find . -type f -name "*.md" -print0 | xargs -0 awk -i inplace 'BEGIN { RS="---solution\n"; ORS="" } NR>1 { print ":::solution\n" $0 "\n:::\n" } NR==1 { print $0 }'
```
