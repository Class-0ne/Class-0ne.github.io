---
layout: page
title: Compressor Restart Load Modeling and MPC
company: LG Electronics
description: 전동 압축기 차압기동 부하 예측과 MPC 제어기 설계 프로젝트.
img: assets/img/project-industry.svg
importance: 3
category: graduate
tags: [MPC, IPMSM, Compressor, Simulink]
---

## Overview

- **과제명**: 데이터 기반 컴프레셔 차압기동 부하 모델링 및 최적제어
- **기간**: 2025.03.01 ~ 2025.12.31
- **발주처**: LG전자
- **역할**: 참여 연구원 → 후반부 실무책임자

전동 압축기 재기동 시 발생하는 차압 유래 기동 부하를 데이터 기반으로 예측하고, 이를 고려한 **MPC** 제어기를 설계한 프로젝트입니다. 예측 모델과 제어기 설계를 함께 연결했다는 점이 특징입니다.

## Problem

압축기 재기동 시 차압으로 인해 발생하는 부하 변동은 제어 성능과 시스템 안정성에 직접적인 영향을 줍니다. 실용적인 제어기 설계를 위해서는 재기동 부하를 예측하고, 전압 제약을 고려한 속도 추종 제어가 필요했습니다.

## Method

- 전동 압축기 재기동 시 부하토크를 예측하기 위한 **LSTM 기반 load torque prediction model** 구축
- **IPMSM dq-axis 모델**을 기반으로 한 **MPC 제어기** 설계
- 속도 추종 성능과 전압 제약을 함께 고려한 제어 구조 정리
- 프로젝트 후반부에는 기존 실무책임자 졸업 이후 과제 흐름을 이어받아 수행

## Direct Contribution

- LSTM 기반 부하토크 예측 파이프라인 구축
- IPMSM dq-axis 기반 MPC 제어 로직 정리 및 구현
- 모델예측제어기 상세설계서 작성
- 후반부 실무책임자로서 과제 진행 정리 및 산출물 관리

## Outputs

- LSTM 기반 부하토크 예측 모델
- MPC 제어기 설계 코드
- 모델예측제어기 상세설계서
- 2025 추계 한국자동차공학회 학술대회 포스터 발표  
  _전기자동차용 IPMSM의 에너지 최적 제어를 위한 MTPA-MPC 기법_

## Why this project matters

이 프로젝트는 데이터 기반 예측과 제어기 설계를 함께 수행한 경험을 보여줍니다. 특히 예측 모델, 물리 기반 제어 모델, 문서화까지 연결해 본 점이 강점입니다.
