#!/bin/bash

TIMEA=`date -r ./snowball.edit.js +"%s"`
TIMEB=`date -r ./snowball.js +"%s"`

echo $TIMEA
echo $TIMEB

if [ $TIMEA -eq $TIMEB ]
then
echo "同じ"
fi

if [ $TIMEA -ne $TIMEB ]
then
echo "違う"
echo "snowball.edit.jsは"
echo $TIMEA
echo "snowball.jsは"
echo $TIMEB
fi

