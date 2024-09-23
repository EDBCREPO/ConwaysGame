#!/usr/bin/bash

# HTML Process
for html in `ls ./view | grep -e '.html$'` ; do
    glunt ./view/$html > ./output/$html # | minify --html
    echo $html '>> processed'
done

# JS Process
for js in `ls ./view | grep -e '.js$'` ; do
    browserify ./view/$js > ./output/$js # | minify --js
    echo $js '>> processed'
done

# CSS Process
for css in `ls ./view | grep -e '.css$'` ; do
    glunt ./view/$css > ./output/$css # | minify --css
    echo $css '>> processed'
done