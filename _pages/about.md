---
layout: about
title: about
permalink: /
subtitle: Hanyang University M.S. student working on DeePC, MPC, data-driven control, and EV thermal management.

profile:
  align: right
  image: LeeJaeHwan.jpg
  image_circular: false
  more_info: >
    <p>이재환 | Jaehwan Lee</p>
    <p>한양대학교 미래자동차공학과 석사과정</p>
    <p>차량 제어 연구실 | 지도교수 한경석</p>
    <p>Seoul, South Korea</p>

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

안녕하세요. 이 사이트는 석사과정 동안 수행한 **산학과제**, **연구 프로젝트**, **발표 및 논문 성과**를 정리한 포트폴리오입니다.

현재 연구의 중심은 **Data-Enabled Predictive Control (DeePC)**, **Model Predictive Control (MPC)**, **data-driven control**, 그리고 **EV Thermal Management System**입니다. 현대자동차와 LG전자 산학과제를 통해 차량 제어, 데이터 기반 모델링, 시뮬레이션 및 검증 업무를 수행하고 있으며, 이 사이트에는 그중 핵심 프로젝트를 우선 정리했습니다.

## Research Interests

- Data-Enabled Predictive Control (DeePC)
- Model Predictive Control (MPC)
- Data-driven Control
- EV Thermal Management System

## Featured projects

{% assign featured_projects = site.projects | sort: "importance" | slice: 0, 3 %}
<div class="projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in featured_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>

## Current Focus

- **석사 연구**: Data-enabled Predictive Control for EV Thermal Management System
- **산학과제**: 개인화 회생제동 제어, 차압기동 부하 예측 및 MPC, 모델 프리 EV 통합 열관리, 브레이크 열용량 예측
- **기술 축**: MATLAB/Python 기반 제어 알고리즘 설계, Simulink/Simscape/CarMaker 시뮬레이션, LSTM/GPR/LLM Multi-Agent 활용

## Selected outputs

- IFAC Online Paper 투고  
  _Personalized Energy-Aware Regenerative Braking Control Minimizing Driver Interventions_
- 2025 추계 한국자동차공학회 학술대회 포스터 발표  
  _전기자동차용 IPMSM의 에너지 최적 제어를 위한 MTPA-MPC 기법_

## This Site

- [Projects]({{ '/projects/' | relative_url }}) 페이지에는 석사과정 동안 수행한 주요 프로젝트를 정리했습니다.
- [CV]({{ '/cv/' | relative_url }}) 페이지에는 학력, 연구 경험, 기술 스택, 발표 이력을 공개용 형식으로 요약했습니다.
- 발표자료와 논문 성과는 가능한 한 관련 프로젝트 맥락 안에서 함께 보여주도록 구성했습니다.
