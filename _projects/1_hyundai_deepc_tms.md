---
layout: page
title: Model-Free EV Thermal Management DeePC
company: Hyundai
description: EV 통합 열관리 시스템을 위한 model-free DeePC 개발 프로젝트.
importance: 1
category: graduate
tags: [DeePC, EV TMS, Simscape, Data-Driven Control]
---

## Overview

- **과제명**: 모델링이 필요 없는 EV 통합 열관리 예측 제어
- **기간**: 2026.04.01 ~ 2026.11.30
- **발주처**: 현대자동차
- **선정**: 현대자동차 미래기술 공모전 채택 (PoC 과제)
- **역할**: 실무책임자

<span style="color: #1a73e8; font-weight: bold; font-size: 1.3rem;">&#9632; 현대자동차 미래기술 공모전에 자체 제안하여 PoC 과제로 채택되었습니다.</span>

배터리, 모터, 인버터, HVAC가 얽힌 EV 통합 열관리 시스템을 **물리 모델 없이 제어**하는 DeePC 프레임워크를 개발하는 프로젝트입니다.

## Key Results

입출력 데이터 기반 **Contextual DeePC**를 설계해, 6개 시나리오 통합 평가에서 전체 Hankel 데이터를 사용하는 Standard DeePC 대비 **실내 온도 추종 오차를 40.4% 감소**시키고 **평균 QP 계산시간을 73.5% 단축**했습니다.

## Problem

EV 통합 열관리 시스템은 배터리·모터·인버터·HVAC 간 열적 상호작용이 복잡하여 정확한 물리 모델을 구성하기가 어렵습니다. 기존 MPC는 고정밀 모델이 필요하기 때문에 모델 구성과 튜닝에 많은 시간이 소요됩니다. 다양한 차종과 운전 조건에 범용적으로 대응 가능한 model-free predictive control 프레임워크가 필요했습니다.

다만 전체 Hankel 데이터를 그대로 사용하는 Standard DeePC는 현재 운전 조건과 관련성이 낮은 데이터까지 예측에 반영할 수 있습니다. EV 통합 열관리처럼 비선형성이 강한 시스템에서는 이로 인해 예측 정확도가 떨어지고, 최적화 문제의 계산 부담도 커질 수 있습니다.

## Approach

- **Simulink/Simscape** 기반 EV 통합 열관리 물리 모델 구성
- DeePC 학습용 2,400초 입출력 데이터 수집 및 Hankel 데이터베이스 구축
- 캐빈 온도, 배터리 온도, 최근 제어 입력을 기준으로 현재 운전 조건과 유사한 데이터 궤적 선택
- 선택된 데이터만으로 Hankel 행렬을 구성하는 **Contextual DeePC** 설계 및 구현
- QP 기반 최적화 구조를 구성하고 `quadprog`를 이용해 조건별 시뮬레이션 검증 수행
- 물리 모델 예측에 데이터 기반 잔차 예측을 더하는 후속 잔차 보정 예측제어 구조 검토

## Direct Contribution

- 현대자동차 미래기술 공모전 제안서 작성 및 과제 기획
- 실무책임자로서 전체 제어 프레임워크 구조 설계
- EV 통합 열관리 Simscape 모델 구성 및 학습 데이터 수집 흐름 정리
- Standard DeePC의 예측 정확도·계산 부담 문제 분석
- Contextual DeePC 데이터 선택 기준 설계 및 제어기 구현
- 실내 온도 추종 오차, 배터리 온도 제약, 평균 QP 계산시간 기준 성능 평가
- ICROS 2026 발표용 데이터 선택 구조와 성능 비교 결과 정리

## Verified Results

검증된 결과는 입출력 데이터 기반 Contextual DeePC에 대한 것입니다. 6개 시나리오 통합 평가에서 Standard DeePC 대비 실내 온도 추종 오차가 **40.4% 감소**했고, 평균 QP 계산시간이 **73.5% 단축**되었습니다.

## Ongoing Research

후속 연구로는 물리 모델 예측에 데이터로 예측한 잔차를 더하는 **잔차 보정 예측제어**를 진행 중입니다. 이 구조는 실제 출력과 물리 모델 예측의 차이를 잔차로 정의하고, 과거 입력과 잔차로 구성한 Hankel 데이터에서 유사 궤적을 선택해 미래 잔차를 예측합니다. 위 정량 성과의 기준은 입출력 데이터 기반 Contextual DeePC이며, 잔차 보정 구조는 현재 확장 중인 연구입니다.

## Academic Output

- [ICROS 2026 학술대회 발표](https://sites.google.com/view/voice-lab/publications/domestic-conference) — *전기차 열관리 시스템을 위한 Contextual Sampling 데이터 기반 예측 제어(DeePC)*

## Initial Targets

초기 과제 목표로 설정한 기준은 다음과 같습니다.

- 실내 온도 추종 오차 10% 이내
- 배터리/모터 안전 범위 위반율 5% 이내
- DeePC 제어기 평균 연산시간 1초 이내
