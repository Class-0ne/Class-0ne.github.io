---
layout: page
title: Compressor Restart Load Modeling and MPC
company: LG Electronics
description: 전동 압축기 차압기동 부하 예측과 MPC 제어기 설계 프로젝트.
importance: 3
category: graduate
tags: [MPC, IPMSM, Compressor, Simulink]
---

## Overview

- **과제명**: 데이터 기반 컴프레셔 차압기동 부하 모델링 및 최적제어
- **기간**: 2025.03.01 ~ 2025.12.31
- **발주처**: LG전자
- **역할**: 참여 연구원 → 후반부 실무책임자

전동 압축기 재기동 시 발생하는 차압 기동 부하를 데이터 기반으로 예측하고, 이를 고려한 MPC 제어기를 설계한 프로젝트입니다.

## Problem

압축기 재기동 시 차압으로 인해 발생하는 부하 변동은 제어 성능과 시스템 안정성에 직접적인 영향을 줍니다. 기존 시뮬레이션은 명목 운전 조건만을 반영하고 있어 차압기동 상황에서 sim-to-real 오차가 발생하고, 반복적인 검증과 튜닝에 2~3주가 소요되는 문제가 있었습니다.

## Approach

- 3상 전류 및 PWM 신호로부터 **LSTM 기반 50-step 부하토크 예측 모델** 구축
- **IPMSM dq-axis 모델** 기반 MPC 제어기 설계 (속도 추종 + 전압 제약)
- 기존 실무책임자 졸업 이후 과제 흐름을 이어받아 후반부 주도 수행

## Direct Contribution

- LSTM 기반 부하토크 예측 파이프라인 구축
- IPMSM dq-axis 기반 MPC 제어 로직 구현
- 모델예측제어기 상세설계서 작성
- 후반부 실무책임자로서 과제 진행 정리 및 산출물 관리

## Outputs

- LSTM 기반 부하토크 예측 모델
- MPC 제어기 설계 코드 및 모델예측제어기 상세설계서
- 2025 추계 한국자동차공학회 학술대회 포스터 발표  - *전기자동차용 IPMSM의 에너지 최적 제어를 위한 MTPA-MPC 기법*
- **LG전자 Target Lab 선정** (2026 ~)
