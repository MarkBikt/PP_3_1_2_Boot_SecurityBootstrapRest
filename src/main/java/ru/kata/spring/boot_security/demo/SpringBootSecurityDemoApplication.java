package ru.kata.spring.boot_security.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
	}

}
// все контроллеры которые не выполняют никаких действий кроме возврата вьюх - вынести в конфиг
//
// public class RestAdminController для рест контроллеров используем путь /api и тд
//
// index() - названия методов должны говорить о том что метод делает .
// Что делает метод индекс я хз  , если он возврщает всех юзеров значит должен
// быть getAllUsers . Поправить все методы  в нормальный вид
//
// @ExceptionHandler - вынести в отдельный класс ,
// класс помечается аннотацией контроллер адвайс
//
// возвращать на фронт ResponseEntity а не голые модели
//
// @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL}) -
// всегда использовать маппинг на 3 таблицу через joinTable ,
// иначе может не правильно собраться связь
//
// пароли в бд должны быть зашифрованы
//
// на html - убрать хардкод ролей руками , заполнять селектор из бд -
// брать все доступные роли и раскидывать на страницу