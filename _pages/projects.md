---
layout: page
title: Projects
permalink: /projects/
description: Master's project archive centered on industry-sponsored research, predictive control, and EV thermal management.
nav: true
nav_order: 1
horizontal: true
---

이 페이지는 석사과정 동안 수행한 주요 프로젝트를 정리한 아카이브입니다.
산학과제와 연구 프로젝트를 분리된 메뉴로 나누기보다, 문제 정의와 기술적 기여가 보이도록 한 곳에 모았습니다.

각 프로젝트 페이지에는 아래 내용을 중심으로 정리했습니다.

- 프로젝트 배경과 목표
- 사용한 방법과 워크플로
- 내가 직접 담당한 구현 및 분석
- 결과, 산출물, 후속 연구 방향

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="container">
    <div class="row row-cols-1">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
</div>
