import React, {useRef, useLayoutEffect} from "react";
import {match} from "assert";

const tournament: React.FC = () => {
  // 人数
  const num = 16;
  const inputHeight = 32;

  let nextYArray = [];

  const appendLine = (x1: number, y1: number, x2: number, y2: number) => {
    const svg = document.getElementById('svg');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    line.setAttribute('stroke', 'black');

    // svgに追加
    svg.appendChild(line);

    return line;
  }

  const appendMatch = (
    canvas: HTMLElement, svg: HTMLElement,
    startX: number, startY: number,
    member: number, round: number, match: number
  ) => {
    let previousLine; // 前回のmatch
    let lastBottom = startY;
    let nextStartX = 0; // 次の横を決める

    // 2Playerで1Match、Matchごとに24pxずつ空ける
    for (let i = 0; i < member / 2; i++) {
      // Matchの初期化
      const matchNode = document.createElement('div');
      matchNode.setAttribute('name', `match`)
      matchNode.style.position = 'absolute';
      matchNode.style.top = `${lastBottom}px`;
      matchNode.style.left = `${startX}px`;

      // ラウンドが1以上ならYの位置を移動させる
      if (round > 0) {
        //TODO 高さをどうにかする
        matchNode.style.top = `${nextYArray.shift() - inputHeight}px`;
      }

      const input1 = document.createElement('input');
      const input2 = document.createElement('input');

      input1.style.height = `${inputHeight}px`;
      input2.style.height = `${inputHeight}px`;

      input1.style.display = 'block';
      input2.style.display = 'block';

      matchNode.appendChild(input1);
      matchNode.appendChild(input2);

      // Matchの追加
      canvas.appendChild(matchNode);

      // 線の描写
      const matchRect = matchNode.getBoundingClientRect();

      // マッチから伸びる横線
      const horizontalLine = appendLine(matchRect.right, (matchRect.top + matchRect.bottom) / 2, matchRect.right + 64, (matchRect.top + matchRect.bottom) / 2);

      // svgサイズの最適化 //TODO 横幅
      if (svg.getBoundingClientRect().bottom < matchRect.bottom)
        svg.style.height = `${matchRect.bottom}px`;

      // 次のmatchに繋がる線の描画
      if (i % 2 == 1) {
        // 2マッチをつなぐ縦線
        const verticalLine = appendLine(horizontalLine.x2.animVal.value, previousLine.y1.animVal.value, horizontalLine.x2.animVal.value, horizontalLine.y1.animVal.value);
        const horizontalLine1 = appendLine(verticalLine.x1.animVal.value, (verticalLine.y1.animVal.value + verticalLine.y2.animVal.value) / 2, verticalLine.x1.animVal.value + 64, (verticalLine.y1.animVal.value + verticalLine.y2.animVal.value) / 2)

        nextYArray.push((verticalLine.y1.animVal.value + verticalLine.y2.animVal.value) / 2);

        nextStartX = horizontalLine1.x2.animVal.value;

        matchNode.style.top = nextYArray[0];
        console.log(nextYArray)
      }

      // previousMatchの更新
      previousLine = horizontalLine;

      // 空間を空ける処理
      lastBottom = matchNode.getBoundingClientRect().bottom + 24;
    }

    if (member / 2 >= 1) {
      appendMatch(canvas, svg, nextStartX, 0, member / 2, round + 1, 0);
    }
  }

  useLayoutEffect(() => {
    // canvasの取得
    const canvas = document.getElementById('canvas');

    // svg1の取得
    const svg = document.getElementById('svg');

    appendMatch(canvas, svg, 0, 0, num, 0, 0);
  })

  return (
    <>
      <div id="canvas">
        <svg id="svg" width="2000px"/>
      </div>
    </>
  );
}

export default tournament;