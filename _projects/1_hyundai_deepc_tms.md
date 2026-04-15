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

- **과제명**: 모델링이 필요없는 EV 통합 열관리 예측 제어
- **기간**: 2026.04.01 ~ 2026.11.30
- **발주처**: 현대자동차
- **선정**: 현대자동차 미래기술 공모전 채택 (PoC 과제)
- **역할**: 실무책임자

<span style="color: #1a73e8; font-weight: bold; font-size: 1.3rem;">&#9632; 현대자동차 미래기술 공모전에 자체 제안하여 PoC 과제로 채택되었습니다.</span>

배터리, 모터, 인버터, HVAC가 얽힌 EV 통합 열관리 시스템을 **물리 모델 없이 제어**하는 DeePC 프레임워크를 개발하는 프로젝트입니다.

## Problem

EV 통합 열관리 시스템은 배터리·모터·인버터·HVAC 간 열적 상호작용이 복잡하여 정확한 물리 모델을 구성하기가 어렵습니다. 기존 MPC는 고정밀 모델이 필요하기 때문에 모델 구성과 튜닝에 많은 시간이 소요됩니다. 다양한 차종과 운전 조건에 범용적으로 대응 가능한 model-free predictive control 프레임워크가 필요했습니다.

## Approach

- **Simulink/Simscape** 기반 EV 통합 열관리 물리 모델 구성
- DeePC 학습용 입출력 데이터 수집 (PRBS excitation)
- **Hankel 행렬 기반 model-free predictive control** 프레임워크 구축
- 다양한 운전 시나리오 및 차종 조건에 대한 성능·범용성 검증

## Direct Contribution

- 현대자동차 미래기술 공모전 제안서 작성 및 과제 기획
- 실무책임자로서 전체 제어 프레임워크 구조 설계
- EV 통합 열관리 Simscape 모델 구성 및 학습 데이터 수집 흐름 정리
- DeePC 제어기 구현 및 시뮬레이션 검증
- 성능 지표 정의 및 연산시간 검토

## Current Targets

- Cabin 온도 추종 성능 평가 오차 10% 이내
- 배터리/PE 안전 범위 위반율 5% 이내
- DeePC 제어기 평균 연산시간 1s 이내
