package com.project.authentication.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.project.authentication.entities.User;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

}
