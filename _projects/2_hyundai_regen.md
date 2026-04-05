---
layout: page
title: Personalized Regenerative Braking Control
company: Hyundai
description: 운전자 선호와 개입 가능성을 함께 고려한 개인화 회생제동 제어 연구.
img: assets/img/project-industry.svg
importance: 2
category: graduate
tags: [MPC, Regenerative Braking, CarMaker]
---

## Overview

- **과제명**: 도심주행에서 에너지 고효율 모션 제어를 위한 주행 최적화 및 실적용성 향상 기술 개발
- **기간**: 2025.07.15 ~ 2026.07.14
- **발주처**: 현대자동차
- **역할**: 참여 연구원

도심주행 조건에서 에너지 효율을 높이면서도 운전자 개입을 최소화할 수 있는 개인화 회생제동 제어기를 설계하는 프로젝트입니다. 에너지 회수량만이 아니라 실제 운전자 수용성과 개입 가능성을 함께 고려한다는 점이 핵심입니다.

## Problem

회생제동은 에너지 효율 측면에서 중요하지만, 제동감이 운전자 기대와 다르면 개입이 증가하고 실차 적용성이 떨어질 수 있습니다. 따라서 주행 에너지 회수와 운전자 수용성을 함께 고려한 제동 전략이 필요했습니다.

## Approach

- 운전자 선호 분포(BPS)와 개입 분포(APS)를 각각 **GPR**로 모델링
- 두 분포 사이에서 **운전자 개입 가능성 - 회수 에너지 trade-off**를 고려한 최적 제동거리 설계
- 제어 알고리즘을 **Simulink** 상에서 구현
- **CarMaker** 기반 데이터 수집 및 도심주행 시나리오 검증

## Direct Contribution

- 운전자 선호 및 개입 분포 모델링 파이프라인 정리
- GPR 기반 personalized braking logic 설계
- Simulink 제어기 구현
- CarMaker 데이터 수집과 시나리오별 검증 수행

## Outputs

- IFAC Online Paper 투고  
  _Personalized Energy-Aware Regenerative Braking Control Minimizing Driver Interventions_
- 시나리오별 제동 성능 및 운전자 개입 분석 결과
- 프로젝트 상세 결과는 추후 그림과 수치 결과 중심으로 보강 예정

## Why this project matters

이 프로젝트는 운전자 모델링, 제어 최적화, 시뮬레이션 검증을 하나의 흐름으로 연결한다는 점에서 현재 포트폴리오의 대표 과제입니다. 취업 관점에서도 데이터 기반 제어, 차량 제어 로직 설계, 가상 검증 경험을 한 번에 보여줄 수 있는 프로젝트입니다.
