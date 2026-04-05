---
layout: about
title: about
permalink: /
subtitle: Automotive engineering M.S. student focused on DeePC, MPC, and EV thermal management.

profile:
  align: right
  image: LeeJaeHwan.jpg
  image_circular: false
  more_info: >
    <p class="profile-name">이재환 | Jaehwan Lee</p>
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

한양대학교 미래자동차공학과 석사과정에서 차량 제어와 EV 열관리 시스템을 연구하고 있습니다. 이 사이트는 석사과정 동안 수행한 주요 산학과제와 연구 프로젝트를 정리한 포트폴리오입니다.

현재는 **DeePC**, **MPC**, **data-driven control**, **EV thermal management**를 중심으로 연구하고 있습니다. 현대자동차와 LG전자 산학과제를 통해 제어기 설계, 데이터 기반 모델링, 시뮬레이션 및 검증 업무를 수행하고 있습니다.

## Focus

- DeePC and MPC for automotive systems
- Data-driven control and modeling
- EV thermal management
- Simulation and validation with Simulink, Simscape, and CarMaker

## Featured projects

{% assign featured_projects = site.projects | sort: "importance" | slice: 0, 3 %}
<div class="projects">
  <div class="container px-0">
    <div class="row row-cols-1">
    {% for project in featured_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
</div>

## Highlights

- 현대자동차: 운전자 선호와 개입 가능성을 함께 고려한 개인화 회생제동 제어
- LG전자: 차압기동 부하 예측과 IPMSM 기반 MPC 제어기 설계
- 현대자동차: EV 통합 열관리 시스템을 위한 model-free DeePC 프레임워크 개발

## Selected Output

- IFAC Online Paper 투고  
  _Personalized Energy-Aware Regenerative Braking Control Minimizing Driver Interventions_
- 2025 추계 한국자동차공학회 학술대회 포스터 발표  
  _전기자동차용 IPMSM의 에너지 최적 제어를 위한 MTPA-MPC 기법_
